import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PageLayout from './layout/Layout'
import { MainRoutes } from './layout/MainRoute';

function App() {
    return (
        <PageLayout>
            <React.Suspense fallback="loading">
                {MainRoutes}
            </React.Suspense>
        </PageLayout>
    );
}

export default App;