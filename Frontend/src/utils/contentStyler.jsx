import { Fragment } from 'react';

export function renderStyledInline(text) {
  if (typeof text !== 'string') return text;

  const tokens = text.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }

    if (token.startsWith('__') && token.endsWith('__')) {
      return <u key={index}>{token.slice(2, -2)}</u>;
    }

    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }

    return token;
  });
}

export function renderStyledContent(text) {
  if (typeof text !== 'string') return null;

  const blocks = text
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const isListBlock = lines.length > 0 && lines.every((line) => line.startsWith('- '));

    if (isListBlock) {
      return (
        <ul key={blockIndex} className="mb-4 list-disc pl-5 text-gray-600 leading-relaxed">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{renderStyledInline(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={blockIndex} className="text-gray-600 leading-relaxed mb-4">
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {renderStyledInline(line)}
          </Fragment>
        ))}
      </p>
    );
  });
}
