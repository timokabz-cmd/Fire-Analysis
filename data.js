/* ==========================================================================
   FIRE — Tips Data
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT EVERY DAY.
   Update the values below with your real picks. The site reads this file
   and builds all the ticket cards automatically — you never need to touch
   index.html or the CSS to publish new tips.

   status accepted values: "pending" | "won" | "lost" | "live"
   flames accepted values: 1 to 5 (confidence rating)
   ========================================================================== */

// 1) BET TIP OF THE DAY — single, featured pick
const tipOfTheDay = {
  league: "⚽ English Premier League",
  kickoff: "Today · 17:00 EAT",
  home: "Manchester City",
  away: "Everton",
  pick: "Manchester City -1.5 (Asian Handicap)",
  odds: "1.85",
  flames: 5,
  status: "pending"
};

// 2) BANKER OF THE WEEK — one high-confidence weekly pick
const bankerOfTheWeek = {
  league: "⚽ UEFA Champions League",
  kickoff: "Wed · 21:00 EAT",
  home: "Bayern Munich",
  away: "Slavia Praha",
  pick: "Bayern Munich to Win & Over 2.5 Goals",
  odds: "1.72",
  flames: 5,
  status: "pending",
  // Last 8 weeks' banker results — "w" for won, "l" for lost
  form: ["w", "w", "w", "l", "w", "w", "l", "w"]
};

// 3) BASKETBALL TIPS
const basketballTips = [
  {
    league: "🏀 NBA",
    kickoff: "Today · 03:30 EAT",
    home: "Boston Celtics",
    away: "Miami Heat",
    pick: "Celtics -6.5",
    odds: "1.90",
    flames: 4,
    status: "pending"
  },
  {
    league: "🏀 NBA",
    kickoff: "Today · 04:00 EAT",
    home: "Denver Nuggets",
    away: "LA Lakers",
    pick: "Over 224.5 Total Points",
    odds: "1.95",
    flames: 3,
    status: "pending"
  },
  {
    league: "🏀 EuroLeague",
    kickoff: "Tomorrow · 22:00 EAT",
    home: "Real Madrid",
    away: "Fenerbahce",
    pick: "Real Madrid to Win",
    odds: "1.65",
    flames: 4,
    status: "pending"
  }
];

// 4) OVERS MARKET — over/under & goals-focused picks
// probability is a rough 0-100 confidence meter shown as a bar
const oversTips = [
  {
    league: "⚽ Bundesliga",
    kickoff: "Today · 19:30 EAT",
    home: "Bayer Leverkusen",
    away: "RB Leipzig",
    pick: "Over 2.5 Goals",
    odds: "1.60",
    flames: 5,
    status: "pending",
    probability: 84
  },
  {
    league: "⚽ Serie A",
    kickoff: "Today · 22:45 EAT",
    home: "Inter Milan",
    away: "Atalanta",
    pick: "Both Teams to Score - Yes",
    odds: "1.55",
    flames: 4,
    status: "pending",
    probability: 78
  },
  {
    league: "⚽ La Liga",
    kickoff: "Tomorrow · 20:00 EAT",
    home: "Real Sociedad",
    away: "Real Betis",
    pick: "Over 1.5 Goals - 1st Half",
    odds: "1.80",
    flames: 3,
    status: "pending",
    probability: 66
  }
];

// 5) LIVE TIPS — in-play picks. Update the minute/score as the match runs.
const liveTips = [
  {
    league: "⚽ EPL · LIVE 63'",
    kickoff: "Score: 1 - 1",
    home: "Newcastle",
    away: "Brighton",
    pick: "Next Goal: Newcastle",
    odds: "2.10",
    flames: 4,
    status: "live"
  },
  {
    league: "🏀 NBA · LIVE Q3",
    kickoff: "Score: 78 - 74",
    home: "Suns",
    away: "Warriors",
    pick: "Suns to Cover -4.5",
    odds: "1.90",
    flames: 3,
    status: "live"
  },
  {
    league: "⚽ Ligue 1 · LIVE 41'",
    kickoff: "Score: 0 - 0",
    home: "PSG",
    away: "Marseille",
    pick: "Over 2.5 Goals (Live)",
    odds: "2.35",
    flames: 4,
    status: "live"
  }
];

// TICKER — recent results shown in the scrolling strip under the hero
const recentResults = [
  { label: "Man City -1.5 AH", result: "won", odds: "1.85" },
  { label: "Lakers Over 224.5", result: "won", odds: "1.95" },
  { label: "Arsenal BTTS", result: "lost", odds: "1.70" },
  { label: "Celtics -6.5", result: "won", odds: "1.90" },
  { label: "PSG Over 2.5", result: "won", odds: "1.60" },
  { label: "Real Madrid Win", result: "won", odds: "1.65" },
  { label: "Bayern Over 3.5", result: "lost", odds: "2.10" },
  { label: "Chelsea Win", result: "won", odds: "2.05" }
];
