// components/WeatherCard.tsx
import { Card, Typography } from "antd";

// заглушки — потом заменишь значениями из контекста
const CITY = "Berlin";
const COUNTRY = "Germany";
const DATE_STR = "Tuesday, Aug 5, 2025";
const TEMP_C = 20;

// подставь свои реальные пути
import bgImage from "/icons/bg-today-large.svg";
import sunIcon from "/icons/icon-sunny.webp";

export default function WeatherCard() {
    return (
        <Card
            bordered={false}
            bodyStyle={{ padding: 24 }}
            style={{
                borderRadius: 20,
                overflow: "hidden",
                background: `url(${bgImage}) center/cover no-repeat`,
                backgroundColor: "#20255a",
            }}
        >
            {/* полупрозрачная вуаль для читаемости текста */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: 16,
                    borderRadius: 16,
                }}
            >
                {/* Лево: место + дата */}
                <div>
                    <Typography.Title
                        level={3}
                        style={{ color: "#fff", margin: 0, fontWeight: 700 }}
                    >
                        {CITY}, {COUNTRY}
                    </Typography.Title>
                    <Typography.Text style={{ color: "rgba(255,255,255,0.85)" }}>
                        {DATE_STR}
                    </Typography.Text>
                </div>

                {/* Право: иконка + температура */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={sunIcon}
                        alt="Sunny"
                        style={{ width: 44, height: 44, display: "block" }}
                    />
                    <div
                        style={{
                            color: "#fff",
                            fontSize: 56,
                            lineHeight: 1,
                            fontWeight: 800,
                            letterSpacing: 0.5,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 4,
                        }}
                    >
                        <span>{TEMP_C}</span>
                        <span style={{ fontSize: 34, marginTop: 4 }}>°</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
