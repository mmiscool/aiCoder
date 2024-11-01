import blessed from'blessed';










import { spawn } from 'node-pty';

// Initialize Blessed Screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Node.js Terminal Multiplexer'
});

// Create a layout
const mainBox = blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  border: 'line',
});

// Terminal pane
function createPane() {
  const pane = blessed.box({
    parent: mainBox,
    width: '50%',
    height: '50%',
    top: 'center',
    left: 'center',
    border: 'line'
  });

  const term = spawn('/bin/bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  term.on('data', data => pane.setContent(data.toString()));
  screen.append(pane);
  screen.render();
}

// Keybindings
screen.key(['C-c'], () => process.exit(0));  // Exit on Ctrl+C
screen.key(['C-n'], createPane);  // New pane on Ctrl+N

// Render
createPane();
screen.render();
