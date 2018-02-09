import { lowlight } from 'lowlight';
import * as React from 'react';

/**
 * When we try to extract a range from an AST, either:
 * 
 * - None of that range is not present in the AST, so we return a number,
 *   which is the amount of characters we skipped. OR
 * - Some of that range is in the AST, so we return the part of the AST
 *   that is in that range, and the text that is in that AST.
 */
type RangeExtractionResult<NodeType extends lowlight.HastNode = lowlight.HastNode> = number | {
  text: string,
  ast: NodeType,
}

function extractAstAtRangeFromNode<NodeType extends lowlight.HastNode>(offset: number, length: number, astSpecificType: NodeType): RangeExtractionResult<NodeType> {
  // HACK: To escape some limitations of the type system we make two references
  // to the AST node that maintain a more specific and more general type.
  const ast: lowlight.HastNode = astSpecificType;

  switch (ast.type) {
  case 'text':
    if (ast.value.length <= offset) {
      return ast.value.length;
    }

    const text = ast.value.substring(offset, offset + length);

    return {
      text,
      ast: Object.assign({ }, astSpecificType, { value: text }),
    };
  case 'element':
  case 'root':
    let textInChildren = null;
    let charactersSkipped = 0;
    const children = [];

    for (const innerAst of ast.children) {
      const extractedAst: RangeExtractionResult = textInChildren == null ?
        // We have not started getting useful text, so we move our start point
        extractAstAtRangeFromNode(offset - charactersSkipped, length, (innerAst as lowlight.HastNode)) :
        // We are progressively filling up with text, so we reduce our length
        extractAstAtRangeFromNode(0, length - textInChildren.length, (innerAst as lowlight.HastNode));

      if (typeof extractedAst === 'number') {
        // This child doesn't contain any text in our range
        charactersSkipped += extractedAst;
      } else {
        textInChildren = (textInChildren || '') + extractedAst.text;
        children.push(extractedAst.ast);

        if (textInChildren.length >= length) {
          break;
        }
      }
    }

    if (textInChildren == null) {
      return charactersSkipped;
    }

    return {
      text: textInChildren,
      ast: Object.assign({ }, astSpecificType, { children }),
    };
  default:
    throw new Error(`Unsupported AST type ${ast.type}`);
  }
}

/**
 * Returns a slice of the given lowlight AST
 * 
 * @param offset The character offset in the source text
 * @param length The number of characters that the returned AST will represent
 * @param ast The nodes to extract from
 */
export function getRangeFromParsedAsts(offset: number, length: number, asts: lowlight.HastNode[]) {
  const ranges = extractAstAtRangeFromNode(offset, length, { type: 'root', children: asts });
  
  if (typeof ranges === 'number') {
    // This really shouldn't happen
    throw new Error(`Offset ${offset} does not exist in input AST.`);
  }

  return ranges.ast.children;
}

export function lowlightAstToReactComponent(ast: lowlight.HastNode): React.ReactNode {
  switch (ast.type) {
  case 'text':
    return ast.value;
  case 'element':
    return React.createElement(ast.tagName, ast.properties, ...(ast.children as lowlight.HastNode[]).map(lowlightAstToReactComponent));
  case 'root':
    return React.createElement(React.Fragment, null, ...(ast.children as lowlight.HastNode[]).map(lowlightAstToReactComponent));
  default:
    throw new Error(`Unsupported AST type ${ast.type}`);
  }
}
