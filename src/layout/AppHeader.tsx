import {Button, Col, Dropdown, Layout, Row} from 'antd';

import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";
import * as React from "react";

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: 'transparent'
};

const items = [
    { key: 'metric', label: 'Metric (°C, m/s)' },
    { key: 'imperial', label: 'Imperial (°F, mph)' },
];

export default function Header() {
    return (
        <>
            <Layout.Header style={headerStyle}>
                <Row justify="space-between" align="middle" wrap={false}>
                    <Col>
                        <img src={logo} alt="Weather Now" style={{ height: 40 }} />
                    </Col>

                    <Col>
                        <Dropdown menu={{ items, onClick: ({ key }) => console.log('units:', key) }} trigger={['click']}>
                            <Button
                                icon={<img src={units} alt="" style={{ width: 18, height: 18 }} />}
                                type="primary"
                                iconPosition='start'
                                style={{
                                    backgroundColor: 'var(--neutral-800)',
                                    borderColor: 'var(--neutral-800)',
                                }}
                            >
                                <span className="text-white">Units</span>
                                <img src={dropdown} alt="" style={{ width: 14, height: 14, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
            </Layout.Header>
        </>
    )
}