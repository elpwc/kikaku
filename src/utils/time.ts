/* eslint-disable no-extra-parens */
/* eslint-disable valid-jsdoc */
/** 各个月份的日数 */
export const monthsDays = (month: number, isLeapYear: boolean = false) => [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];

/** 判断闰年 */
export const isLeapYear = (year: number) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

/** 获取星期 0-6 */
export const weekDay = (y: number, m: number, d: number) => new Date(y, m - 1, d).getDay();

export const months = (month: number) => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][month - 1];
export const weekdays = (weekday: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][weekday];

/** 月内周数，一周内占一半以上就算在这个月 */
export const getWeeksCount = (y: number, m: number) => {
  let dayCount = monthsDays(m);

  let first = weekDay(y, m, 1);
  let last = weekDay(y, m, dayCount);

  let weekCount = 0;
  if (first <= 3) {
    weekCount++;
  }
  if (last >= 3) {
    weekCount++;
  }
  weekCount += (dayCount - last + first - 8) / 7; //(dayCount - (last + 1) - (7 - first)) / 7;

  return weekCount;
};

/** 月内各周，一周内占一半以上就算在这个月 */
export const getWeeks = (y: number, m: number, includeDateInOtherMonths: boolean = false): { start: { m: number; d: number }; end: { m: number; d: number } }[] => {
  let dayCount = monthsDays(m, isLeapYear(y));

  let first = weekDay(y, m, 1);
  let last = weekDay(y, m, dayCount);

  const res: { start: { m: number; d: number }; end: { m: number; d: number } }[] = [];
  if (first <= 3) {
    if (includeDateInOtherMonths) {
      // 包含其他月份的日期
      if (first === 0) {
        // 如果1号是星期日
        res.push({ start: { m, d: 1 }, end: { m, d: 7 } });
      } else {
        // 1号不是星期日
        const lastMonth = m - 1 === 0 ? 12 : m - 1;
        const lastMonthDayCount = m - 1 === 0 ? monthsDays(12) : monthsDays(m - 1, isLeapYear(y - 1));
        res.push({ start: { m: lastMonth, d: lastMonthDayCount - first + 1 }, end: { m, d: 7 - first } });
      }
    } else {
      // 只包含这个月份的日期
      res.push({ start: { m, d: 1 }, end: { m, d: 7 - first } });
    }
  }
  let currentStartDay = 7 - first + 1;

  while (currentStartDay !== dayCount + 1) {
    if (dayCount - currentStartDay <= 7) {
      // 最後一周
      if (includeDateInOtherMonths) {
        // 包含其他月份的日期
        if (last === 6) {
          // 如果30 31号是星期六

          res.push({ start: { m, d: currentStartDay }, end: { m, d: last + currentStartDay } });
        } else {
          // 30 31号不是星期六
          const nextMonth = m + 1 === 13 ? 1 : m + 1;
          res.push({ start: { m, d: currentStartDay }, end: { m: nextMonth, d: 6 - last } });
        }
      } else {
        // 只包含这个月份的日期

        res.push({ start: { m, d: currentStartDay }, end: { m, d: last + currentStartDay } });
      }
      currentStartDay = dayCount + 1;
    } else {
      // 除了开头和末尾的中间两周
      res.push({ start: { m, d: currentStartDay }, end: { m, d: 6 + currentStartDay } });
      currentStartDay = currentStartDay + 7;
    }
  }

  return res;
};

// 日期在哪一周
export const whichWeek = (y: number, m: number, d: number): { y: number; m: number; w: number } => {
  let crtMWeeks = getWeeks(y, m, true);

  let res = -1;

  if (m === crtMWeeks[0].start.m && d < crtMWeeks[0].start.d) {
    return { y: m === 1 ? y - 1 : y, m: m === 1 ? 12 : m - 1, w: getWeeksCount(m === 1 ? y - 1 : y, m === 1 ? 12 : m - 1) };
  }

  if (m === crtMWeeks[crtMWeeks.length - 1].end.m && d > crtMWeeks[crtMWeeks.length - 1].end.d) {
    return { y: m === 12 ? y + 1 : y, m: m === 12 ? 1 : m + 1, w: 1 };
  }

  crtMWeeks = getWeeks(y, m, false);

  for (let i = 0; i < crtMWeeks.length; i++) {
    if (d >= crtMWeeks[i].start.d && d <= crtMWeeks[i].end.d) {
      res = i + 1;
      break;
    }
  }

  if (res !== -1) {
    return { y, m, w: res };
  }

  return { y, m, w: 1 };
};

/** 第x周第x天是哪一天 */
export const whichDate = (y: number, m: number, w: number, day: number): { y: number; m: number; d: number } => {
  const week = getWeeks(y, m, true)[w - 1];
  let resY = y;
  let resM = week.start.m;
  let resD = week.start.d;

  const monthLength = monthsDays(resM, isLeapYear(resY));

  if (resD + day > monthLength) {
    resD = resD + day - monthLength;
    resM++;
    if (resM === 13) {
      resM = 1;
      resY++;
    }
  } else {
    resD += day;
  }

  return { y: resY, m: resM, d: resD };
};
