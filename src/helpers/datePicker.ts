export function getRandomCheckinAndCheckoutDates() {
  const today = new Date();
  const checkinOffset = Math.floor(Math.random() * 14) + 7; // 7-20 days ahead
  const checkinDate = new Date(today);
  checkinDate.setDate(today.getDate() + checkinOffset);

  const stayLength = Math.floor(Math.random() * 5) + 1; // 1-5 nights
  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + stayLength);

  return { checkinDate, checkoutDate };
}

export function formatDateForAriaLabel(date: Date): string {
  // Get parts
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  // Add comma after weekday
  return `Choose ${weekday}, ${day} ${month} ${year}`;
}

export function formatDateForConfirmation(date: Date): string {
  return date.toISOString().split('T')[0];
}
