async function getAnalytics() {
    const res = await fetch("http://localhost:3000/api/analytics", {
        cache: "no-store",
    });

    return res.json();
}

export default async function AnalyticsPage() {
    const data = await getAnalytics();

    return (
        <main style={{ padding: "40px", fontFamily: "Arial" }}>
            <h1>AI Analytics Preview</h1>

            <section style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
                <h2>Summary</h2>
                <p>{data.summary}</p>
            </section>

            <section style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
                <h2>Suggestions</h2>
                <ul>
                    {data.suggestions.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>

            <section style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
                <h2>Chart Data</h2>
                <pre>{JSON.stringify(data.pieChart, null, 2)}</pre>
                <pre>{JSON.stringify(data.weeklyFocusTime, null, 2)}</pre>
            </section>
        </main>
    );
}