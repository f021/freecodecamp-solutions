const example = `Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](http://freecodecamp.com/hermanfassett)*`;

const createMarkup = (value) => {
  return {
    __html: marked(value)
  };
};

const App = ({ value, change }) => {
  return (
    <div className='wrap'>
      <textarea className='input' onInput={change}>
        {value}
      </textarea>
      <div className='output' dangerouslySetInnerHTML={createMarkup(value)} />
    </div>
  );
};

const render = (str) => {
  React.render(
    <App
      value={str}
      change={(e)=>{
      render(e.target.value);
      }}
    />,
    document.getElementById('root')
   );
};

render(example);
