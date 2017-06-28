const blessed = require('blessed');

const origMathSin = Math.sin;

Math.sin = val => {
  if (val !== undefined) {
    return origMathSin(val);
  }

  const STRING = 'undefinedundefinedundefinedundefined';
  const WIDTH = STRING.length;
  const HEIGHT = 10;
  const DELTA = .2;

  function getPointPosition(t, offset) {
    return {
      x: offset,
      y: Math.round(Math.sin(t + DELTA * offset) * (HEIGHT / 2 - 1) + HEIGHT / 2),
    }
  }

  function getStrSym(i) {
    return STRING[STRING.length % i];
  }

  function getContent(t) {
    const raw = [];
    for (let h = 0; h < HEIGHT; h++) {
      for (let w = 0; w < WIDTH; w++) {
        raw.push(' ');
      }
      raw.push('\n');
    }
    for (let i = 2; i < WIDTH; i++) {
      const symPos = getPointPosition(t, i);
      raw[(WIDTH + 1) * symPos.y + symPos.x] = STRING[i];
    }
    return raw.join('');
  }

  var screen = blessed.screen({
    smartCSR: true
  });

  screen.key(['escape', 'q', 'C-c'], _ => process.exit(0));

  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: WIDTH + 4,
    height: HEIGHT + 4,
    content: '',
    tags: true,
    border: {
      type: 'line'
    }
  });

  screen.append(box);

  screen.render();

  let i = 0;
  setInterval(_ => {
    i+=.1;
    box.setContent(getContent(i));
    screen.render();
  }, 100)
}

module.exports = 'Javascript time!';
