import React, { useState } from 'react';
import { User, ViewState, Patient, SystemConfigItem, ReflectionLog } from './types';
import { MOCK_CONFIG, MOCK_REFLECTIONS, SIMULATED_ANOMALIES } from './constants';

// Componentes
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Agenda from './components/Agenda';
import Patients from './components/Patients';
import Communication from './components/Communication';
import IADental from './components/IADental';
import IADentalFloatChat from './components/IADentalFloatChat';
import Management from './components/Management';
import Documents from './components/Documents';
import Config from './components/Config';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<ViewState>('dashboard');
    const [patientToSchedule, setPatientToSchedule] = useState<Patient | null>(null);

    // Estado global para IADental (Sistema de Auto-Reflexión)
    const [systemConfig, setSystemConfig] = useState<SystemConfigItem[]>(MOCK_CONFIG);
    const [reflectionLogs, setReflectionLogs] = useState<ReflectionLog[]>(MOCK_REFLECTIONS);

    // Handler para simular análisis de reflexión
    const handleSimulateAnalysis = () => {
        const randomAnomaly = SIMULATED_ANOMALIES[Math.floor(Math.random() * SIMULATED_ANOMALIES.length)];
        const exists = reflectionLogs.some(log => log.description === randomAnomaly.description);
        if (exists) return;

        const newLog: ReflectionLog = {
            id: `REF-${Math.floor(Math.random() * 10000)}`,
            timestamp: new Date(),
            errorType: randomAnomaly.errorType,
            description: randomAnomaly.description,
            proposedFix: randomAnomaly.proposedFix,
            status: 'PENDING'
        };

        (newLog as any)._configPayload = {
            key: randomAnomaly.configKey,
            value: randomAnomaly.configValue,
            description: `Auto-generado desde Reflexión ${newLog.id}`,
            category: 'BUSINESS_RULE'
        };

        setReflectionLogs(prev => [newLog, ...prev]);
    };

    // Handler para decisiones de reflexión
    const handleReflectionDecision = (id: string, decision: 'APPROVED' | 'REJECTED') => {
        setReflectionLogs(prev => prev.map(log => {
            if (log.id !== id) return log;

            if (decision === 'APPROVED' && log.status === 'PENDING') {
                const payload = (log as any)._configPayload;
                if (payload) {
                    setSystemConfig(prevConfigs => {
                        const exists = prevConfigs.find(c => c.key === payload.key);
                        if (exists) return prevConfigs;
                        return [...prevConfigs, {
                            key: payload.key,
                            value: payload.value,
                            description: payload.description,
                            isEditable: true,
                            category: payload.category
                        }];
                    });
                }
            }

            return { ...log, status: decision };
        }));
    };

    // Si no hay usuario, mostrar login
    if (!currentUser) {
        return <Login onLogin={setCurrentUser} />;
    }

    // Renderizar vista actual
    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard onNavigate={setCurrentView} />;
            case 'agenda':
                return (
                    <Agenda
                        preselectedPatient={patientToSchedule}
                        onClearPreselectedPatient={() => setPatientToSchedule(null)}
                    />
                );
            case 'patients':
                return (
                    <Patients
                        onNavigate={setCurrentView}
                        onScheduleAppointment={setPatientToSchedule}
                    />
                );
            case 'communication':
                return <Communication />;
            case 'management':
                return <Management />;
            case 'documents':
                return <Documents />;
            case 'ia-dental':
                return (
                    <IADental
                        systemConfig={systemConfig}
                        setSystemConfig={setSystemConfig}
                        reflectionLogs={reflectionLogs}
                        onReflectionDecision={handleReflectionDecision}
                        onSimulate={handleSimulateAnalysis}
                    />
                );
            case 'config':
                return <Config />;
            default:
                return <Dashboard onNavigate={setCurrentView} />;
        }
    };

    return (
        <>
            <Layout
                user={currentUser}
                currentView={currentView}
                onNavigate={setCurrentView}
                onLogout={() => {
                    setCurrentUser(null);
                    setCurrentView('dashboard');
                }}
            >
                {renderView()}
            </Layout>

            {/* Chat Flotante de IADental para Admin */}
            <IADentalFloatChat
                user={currentUser}
                systemConfig={systemConfig}
            />
        </>
    );
};

export default App;
