import {Layout, Typography} from "antd";
import * as React from "react";
import SearchBar from "../components/SearchBar.tsx";

const { Title } = Typography;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor:'var(--neutral-900)',
    padding: '1rem',
};
export default function AppContent() {
    return (
        <Layout.Content style={contentStyle}>
            <Title className='!text-[var(--neutral-0)] text-preset-2'> How's the sky looking today? </Title>
            <SearchBar/>
        </Layout.Content>
    )
}