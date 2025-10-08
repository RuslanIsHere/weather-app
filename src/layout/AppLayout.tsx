import {Layout} from "antd";
import AppHeader from './AppHeader.tsx'
import AppContent from './AppContent.tsx'


export default function  AppLayout() {
    return (
        <Layout className='flex justify-center max-w-5xl mx-auto' style={{ background: 'transparent' }} >
            <AppHeader />
            <Layout style={{ background: 'transparent' }}>
                <AppContent />
            </Layout>
        </Layout>
    )
}