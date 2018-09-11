// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable */
import test from 'tape-catch';
import {XVIZBuilder} from '@xviz/builder';

function almostEqual(a, b, tolerance = 0.00001) {
  return Math.abs(a - b) < tolerance;
}

test('XVIZBuilder#default-ctor', t => {
  const builder = new XVIZBuilder({});
  t.end();
});

test('XVIZBuilder#polygon', t => {
  const builder = new XVIZBuilder();

  const verts = [[0, 0, 0], [4, 0, 0], [4, 3, 0]];

  builder
    .pose({time: 1.0})
    .stream('/test/polygon')
    .polygon(verts);

  const expected = {
    vehicle_pose: {time: 1.0},
    state_updates: [
      {
        timestamp: 1.0,
        primitives: {
          '/test/polygon': [
            {
              type: 'polygon',
              vertices: verts
            }
          ]
        }
      }
    ]
  };

  t.deepEqual(builder.getFrame(), expected, 'XVIZBuilder polygon matches expected output');
  t.end();
});

test('XVIZBuilder#polyline', t => {
  const builder = new XVIZBuilder({streams: {}}, [], {});

  const verts = [[0, 0, 0], [4, 0, 0], [4, 3, 0]];

  builder
    .pose({time: 1.0})
    .stream('/test/polyline')
    .polyline(verts);

  const expected = {
    vehicle_pose: {time: 1.0},
    state_updates: [
      {
        timestamp: 1.0,
        primitives: {
          '/test/polyline': [
            {
              type: 'polyline',
              vertices: verts
            }
          ]
        }
      }
    ]
  };

  t.deepEqual(builder.getFrame(), expected, 'XVIZBuilder polyline matches expected output');
  t.end();
});

test('XVIZBuilder#circle', t => {
  const builder = new XVIZBuilder({streams: {}}, [], {});
  const pos = [4, 3, 0];

  builder
    .pose({time: 1.0})
    .stream('/test/circle')
    .circle(pos, 5);

  const expected = {
    vehicle_pose: {time: 1.0},
    state_updates: [
      {
        timestamp: 1.0,
        primitives: {
          '/test/circle': [
            {
              type: 'circle',
              center: pos,
              radius_m: 5
            }
          ]
        }
      }
    ]
  };

  console.log(JSON.stringify(builder.getFrame()));
  t.deepEqual(builder.getFrame(), expected, 'XVIZBuilder circle matches expected output');
  t.end();
});

test('XVIZBuilder#text', t => {
  const builder = new XVIZBuilder({streams: {}}, [], {});
  const pos = [4, 3, 0];

  builder
    .pose({time: 1.0})
    .stream('/test/text')
    .text('test message')
    .position(pos);

  const expected = {
    vehicle_pose: {time: 1.0},
    state_updates: [
      {
        timestamp: 1.0,
        primitives: {
          '/test/text': [
            {
              type: 'text',
              text: 'test message',
              position: pos
            }
          ]
        }
      }
    ]
  };

  t.deepEqual(builder.getFrame(), expected, 'XVIZBuilder text matches expected output');
  t.end();
});

test('XVIZBuilder#stadium', t => {
  const builder = new XVIZBuilder();
  const pos = [[4, 3, 0], [8, 6, 0]];

  builder
    .pose({time: 1.0})
    .stream('/test/stadium')
    .stadium(pos[0], pos[1], 5);

  const expected = {
    vehicle_pose: {time: 1.0},
    state_updates: [
      {
        timestamp: 1.0,
        primitives: {
          '/test/stadium': [
            {
              type: 'stadium',
              start: pos[0],
              end: pos[1],
              radius_m: 5
            }
          ]
        }
      }
    ]
  };

  t.deepEqual(builder.getFrame(), expected, 'XVIZBuilder stadium matches expected output');
  t.end();
});