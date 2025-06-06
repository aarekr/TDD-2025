import "./polyfills";
import express from "express";

// Refactor the following code to get rid of the legacy Date class.
// Use Temporal.PlainDate instead. See /test/date_conversion.spec.mjs for examples.

function createApp(database) {
  const app = express();

  app.put("/prices", (req, res) => {
    const type = req.query.type;
    const cost = parseInt(req.query.cost);
    database.setBasePrice(type, cost);
    res.json();
  });

  app.get("/prices", (req, res) => {
    const age = req.query.age ? parseInt(req.query.age) : undefined;
    const type = req.query.type;
    const baseCost = database.findBasePriceByType(type).cost;
    const datePlain = parseDatePlain(req.query.date);
    const cost = calculateCost(age, type, baseCost, datePlain);
    res.json({ cost });
  });

  function parseDatePlain(dateString) {
    if (dateString) {
      return Temporal.PlainDate.from(dateString);
    }
  }

  function calculateCost(age, type, baseCost, datePlain) {
    if (type === "night") {
      return calculateCostForNightTicket(age, baseCost);
    } else {
      return calculateCostForDayTicket(age, baseCost, datePlain);
    }
  }

  function calculateCostForNightTicket(age, baseCost) {
    if (age === undefined) {
      return 0;
    }
    if (age < 6) {
      return 0;
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.4);
    }
    return baseCost;
  }

  function calculateCostForDayTicket(age, baseCost, datePlain) {
    let reduction = calculateReduction(datePlain);
    if (age === undefined) {
      return Math.ceil(baseCost * (1 - reduction / 100));
    }
    if (age < 6) {
      return 0;
    }
    if (age < 15) {
      return Math.ceil(baseCost * 0.7);
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.75 * (1 - reduction / 100));
    }
    return Math.ceil(baseCost * (1 - reduction / 100));
  }

  function calculateReduction(datePlain) {
    let reduction = 0;
    if (datePlain && isMonday(datePlain) && !isHoliday(datePlain)) {
      reduction = 35;
    }
    return reduction;
  }

  function isMonday(datePlain) {
    return datePlain.dayOfWeek === 1;
  }

  function isHoliday(datePlain) {
    const holidays = database.getHolidays();
    for (let row of holidays) {
      let holidayPlain = Temporal.PlainDate.from(row.holiday);
      if (
        datePlain &&
        datePlain.year === holidayPlain.year &&
        datePlain.month === holidayPlain.month &&
        datePlain.day === holidayPlain.day
      ) {
        return true;
      }
    }
    return false;
  }

  return app;
}

export { createApp };
