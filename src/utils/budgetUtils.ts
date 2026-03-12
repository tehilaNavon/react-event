import type { CategoryBudget } from "../pages/BudgetItemsPage";

export const redistributeBudget = (
  prev: CategoryBudget[],
  id: number,
  newVal: number,
  totalBudget: number,
): CategoryBudget[] => {
  const target = prev.find((b) => b.categoryID === id);
  if (!target || target.locked || target.ignored) return prev;

  const sanitizedNewVal = Math.min(Math.max(newVal, target.min), target.max);
  if (sanitizedNewVal === target.currentAmount) return prev;

  const lockedTotal = prev
    .filter((b) => b.categoryID !== id && (b.locked || b.ignored))
    .reduce((s, b) => s + (b.ignored ? 0 : b.currentAmount), 0);

  const neededFromRecipients = totalBudget - sanitizedNewVal - lockedTotal;

  const allRecipients = prev.filter(
    (b) => b.categoryID !== id && !b.ignored && !b.locked,
  );

  if (allRecipients.length === 0) return prev;

  const minPossible = allRecipients.reduce((s, b) => s + b.min, 0);
  const maxPossible = allRecipients.reduce((s, b) => s + b.max, 0);

  if (neededFromRecipients < minPossible || neededFromRecipients > maxPossible)
    return prev;

  const amounts = new Map<number, number>(
    allRecipients.map((b) => [b.categoryID, b.currentAmount]),
  );

  for (let round = 0; round < allRecipients.length + 1; round++) {
    const currentSum = [...amounts.values()].reduce((s, v) => s + v, 0);
    const diff = neededFromRecipients - currentSum;
    if (Math.abs(diff) < 1) break;

    const goingUp = diff > 0;
    const canAdjust = allRecipients.filter((b) => {
      const cur = amounts.get(b.categoryID)!;
      return goingUp ? cur < b.max : cur > b.min;
    });
    if (canAdjust.length === 0) break;

    const totalHeadroom = canAdjust.reduce((s, b) => {
      const cur = amounts.get(b.categoryID)!;
      return s + (goingUp ? b.max - cur : cur - b.min);
    }, 0);

    for (const b of canAdjust) {
      const cur = amounts.get(b.categoryID)!;
      const headroom = goingUp ? b.max - cur : cur - b.min;
      const share =
        totalHeadroom > 0
          ? (headroom / totalHeadroom) * diff
          : diff / canAdjust.length;
      amounts.set(b.categoryID, Math.min(Math.max(cur + share, b.min), b.max));
    }
  }

  const finalSum = [...amounts.values()].reduce((s, v) => s + v, 0);
  const roundingError = neededFromRecipients - finalSum;
  if (Math.abs(roundingError) >= 1) {
    const adjustable = allRecipients.find((b) => {
      const cur = amounts.get(b.categoryID)!;
      return roundingError > 0 ? cur < b.max : cur > b.min;
    });
    if (adjustable) {
      const cur = amounts.get(adjustable.categoryID)!;
      amounts.set(
        adjustable.categoryID,
        Math.min(Math.max(cur + roundingError, adjustable.min), adjustable.max),
      );
    }
  }

  return prev.map((b) => {
    if (b.categoryID === id)
      // return { ...b, currentAmount: sanitizedNewVal, plannedAmount: sanitizedNewVal };
      return { ...b, currentAmount: sanitizedNewVal };
    if (amounts.has(b.categoryID))
      return { ...b, currentAmount: Math.round(amounts.get(b.categoryID)!) };
    return b;
  });
};
