import d3 from 'd3';
import { pluck, map } from 'lodash';

export default function MyHistoryController($scope, goals, times) {
  $scope.goals = goals;

  $scope.historyModel = { goalShowing: null };

  $scope.$watch('historyModel.goalShowing', () => {
    const goalId = $scope.historyModel.goalShowing;
    const yearShowing = '2015';
    const data = map(times[yearShowing] || [], (obj, i) => {
      return { day: i, times: obj[goalId] || null };
    }).filter(({ times }) => !!times);
    renderTimeseries(data, goals.$getRecord(goalId));
  });
}

function renderTimeseries(data, goal) {
  const margin = { top: 12, right: 12, bottom: 20, left: 64 };
  const width = 360 - margin.left - margin.right;
  const height = 240 - margin.top - margin.bottom;

  const x = d3.scale.linear().range([0, width]);
  const y = d3.scale.linear().range([height, 0]);

  const xAxis = d3.svg.axis().scale(x).orient('bottom');
  const yAxis = d3.svg.axis().scale(y).orient('left');

  const area = d3.svg.area().x(d => x(d.day)).y1(d => y(d.times)).y0(height);
  const goalLine = d3.svg.line().x(d => x(d.day)).y(d => y(d.times));

  const goalLineData = [
    { times: goal ? goal.times : 0, day: 0 },
    { times: goal ? goal.times : 0, day: 364 }
  ];

  const svg = d3.select('.chart-zone').html('').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(d3.extent(data, d => d.day));
  y.domain([0, d3.max([...data, ...goalLineData], d => d.times)]);

  svg.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);

  svg.append('path')
      .datum(goalLineData)
      .attr('class', 'goal')
      .attr('d', goalLine);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -48)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Times');
}
