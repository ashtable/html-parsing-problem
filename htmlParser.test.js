const htmlParser = require('./htmlParser');

test('Parsing a undefined string returns undefined', () => {
  // Arrange
  let htmlString; 

  // Act
  const result = htmlParser(htmlString);

  // Assert
  expect(result).toStrictEqual(undefined);
});

test('Parsing a valid HTML string returns \'valid\'', () => {
  // Arrange
  const htmlString = '<div>hello!</div>';

  // Act
  const result = htmlParser(htmlString);

  // Assert
  expect(result).toStrictEqual('valid');
});

test('Parsing a more complex valid HTML string returns \'valid\'', () => {
  // Arrange
  const htmlString = '<div><p><i><em><b>hello!</b></em></i></p></div>';

  // Act
  const result = htmlParser(htmlString);

  // Assert
  expect(result).toStrictEqual('valid');
});

test('Parsing <div><p>hi</b></div> returns \'p\'', () => {
  // Arrange
  const htmlString = '<div><p>hi</b></div>';

  // Act
  const result = htmlParser(htmlString);

  // Assert
  expect(result).toStrictEqual('p');
});


test('Parsing <b><p>hi</p></div> returns \'b\'', () => {
  // Arrange
  const htmlString = '<b><p>hi</p></div>';

  // Act
  const result = htmlParser(htmlString);

  // Assert
  expect(result).toStrictEqual('b');
});
