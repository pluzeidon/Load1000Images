import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactIsland from '../src/components/react/ReactIsland.client.jsx';

describe('ReactIsland', () => {
  it('renders button', () => {
    render(React.createElement(ReactIsland));
    const btn = screen.getByText('Abrir Art 1');
    expect(btn).toBeTruthy();
  });
});
