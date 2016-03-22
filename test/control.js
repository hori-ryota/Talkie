/* global YourApp */
'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import ClickEvent from './libs/click-event';
import KeyEvent from './libs/key-event';
import control from '../src/control';

describe('control', function() {

  it('key(string)', function(done) {
    control.keydown('q').subscribe(function(e) {
      assert(e.keyCode === 81);
      done();
    });
    KeyEvent.simulate(81, 81);
  });

  it('key(number)', function(done) {
    control.keydown(80).subscribe(function(e) {
      assert(e.keyCode === 80);
      done();
    });
    KeyEvent.simulate(80, 80);
  });

  it('key().onValue() called once', function() {
    let spy = sinon.spy(function(e) {
      // noop
    });
    control.keydown(79).subscribe(spy);
    KeyEvent.simulate(82, 82);
    KeyEvent.simulate(79, 79);
    assert(spy.calledOnce);
  });

  it('key().onValue() called several times', function() {
    let spy = sinon.spy(function(e) {
      // noop
    });
    control.keydown(79).subscribe(spy);
    KeyEvent.simulate(79, 79);
    KeyEvent.simulate(79, 79);
    KeyEvent.simulate(79, 79);
    assert(spy.calledThrice);
  });

  it('click()', function() {
    let spy = sinon.spy(function(e) {
      // noop
    });

    let target = document.createElement('div');
    control.click(target).subscribe(spy);

    ClickEvent.simulate(target);
    assert(spy.calledOnce);
    ClickEvent.simulate(target);
    assert(spy.calledTwice);
    ClickEvent.simulate(target);
    assert(spy.calledThrice);
  });

});
