import { NextResponse } from "next/server";

export async function GET() {
    const analytics = {
        summary:
            "You completed 4 tasks this week. You still have 3 pending tasks and 1 overdue task.",
        suggestions: [
            "Prioritize overdue tasks first.",
            "Use two 25-minute focus sessions tomorrow.",
            "Avoid adding new tasks until current tasks are reduced to 2 or fewer.",
        ],
        pieChart: [
            { label: "Completed", value: 4 },
            { label: "Pending", value: 3 },
            { label: "Overdue", value: 1 },
        ],
        weeklyFocusTime: [
            { day: "Mon", minutes: 25 },
            { day: "Tue", minutes: 50 },
            { day: "Wed", minutes: 30 },
            { day: "Thu", minutes: 60 },
            { day: "Fri", minutes: 20 },
        ],
    };

    return NextResponse.json(analytics);
}