'use strict';

var CLOUD_POSITION = {
  X: 100,
  Y: 10
};

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_OFFSET = 10;

var CLOUD_TEXT_FAMILY = 'PT Mono';
var CLOUD_TEXT_COLOR = '#000000';
var CLOUD_TEXT_SIZE = 16;
var CLOUD_TEXT_PADDING = 15;
var CLOUD_TEXT = ['Ура вы победили!', 'Список результатов:'];

var HISTOGRAM_COLUMN_WIDTH = 40;
var HISTOGRAM_COLUMN_HEIGHT = 150;
var HISTOGRAM_COLUMN_MARGIN = 50;
var HISTOGRAM_MARGIN_LEFT = 70;
var HISTOGRAM_COLUMN_COLOR_SELF = 'rgba(255, 0, 0, 1)';
var HISTOGRAM_TEXT_INTERVAL = 5;

var SELF_NAME = 'Вы';
var FIELD_HEIGHT = 250;

var getPlayerColour = function (name) {
  return name === SELF_NAME ? HISTOGRAM_COLUMN_COLOR_SELF : 'hsl(240, ' + (Math.random() * 100 + 1) + '%, 50%)';
};

var getMaxTime = function (times) {
  var maxTime = -1;

  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx);
  drawText(ctx);
  drawHistogram(ctx, names, times);
};

var drawCloud = function (ctx) {
  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  ctx.fillRect(CLOUD_POSITION.X + CLOUD_SHADOW_OFFSET, CLOUD_POSITION.Y + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_POSITION.X, CLOUD_POSITION.Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var drawText = function (ctx) {
  ctx.font = CLOUD_TEXT_SIZE + 'px ' + CLOUD_TEXT_FAMILY;
  ctx.fillStyle = CLOUD_TEXT_COLOR;

  for (var i = 0; i < CLOUD_TEXT.length; i++) {
    ctx.fillText(CLOUD_TEXT[i], CLOUD_POSITION.X + CLOUD_TEXT_PADDING, CLOUD_POSITION.Y + (CLOUD_TEXT_SIZE + CLOUD_TEXT_PADDING) * (i + 1));
  }
};

var drawHistogram = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  for (var i = 0; i < times.length; i++) {
    var histogramColumnX = HISTOGRAM_MARGIN_LEFT + (HISTOGRAM_COLUMN_MARGIN + HISTOGRAM_COLUMN_WIDTH) * (i + 1);
    var histogramColumnY = FIELD_HEIGHT - HISTOGRAM_COLUMN_HEIGHT;
    var height = HISTOGRAM_COLUMN_HEIGHT * (times[i] / maxTime);
    ctx.fillStyle = getPlayerColour(names[i]);
    ctx.fillRect(histogramColumnX, FIELD_HEIGHT - height, HISTOGRAM_COLUMN_WIDTH, height);
    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(Math.floor(times[i]), histogramColumnX, histogramColumnY - HISTOGRAM_TEXT_INTERVAL);
    ctx.fillText(names[i], histogramColumnX, FIELD_HEIGHT + HISTOGRAM_TEXT_INTERVAL + CLOUD_TEXT_SIZE);
  }
};

