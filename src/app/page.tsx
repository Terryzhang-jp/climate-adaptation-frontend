'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import GaugePanel from '@/components/charts/GaugePanel';
import PredictionChart from '@/components/charts/PredictionChart';
import AdaptationControls from '@/components/controls/AdaptationControls';
import UserNameDialog from '@/components/ui/UserNameDialog';
import { useSimulation } from '@/hooks/useSimulation';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [scenarioName] = useState('シナリオ1');
  const [selectedIndicator, setSelectedIndicator] = useState('Crop Yield');
  const [openNameDialog, setOpenNameDialog] = useState(false);

  const {
    decisionVar,
    currentValues,
    simulationData,
    chartPredictData,
    loading,
    error,
    showResultButton,
    updateDecisionVar,
    handleClickCalc,
    fetchForecastData,
    handleShowResult
  } = useSimulation();

  // Initialize user name
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (!storedName || storedName.trim() === '') {
      setOpenNameDialog(true);
    } else {
      setUserName(storedName);
    }
  }, []);

  // Fetch forecast data when decision variables change
  useEffect(() => {
    if (userName) {
      fetchForecastData(userName, scenarioName);
    }
  }, [decisionVar, userName, scenarioName, fetchForecastData]);

  const handleUserNameRegister = (name: string) => {
    setUserName(name);
    setOpenNameDialog(false);
  };

  const handleSimulate = () => {
    if (!userName || userName.trim() === '') {
      alert('お名前を入力してください');
      setOpenNameDialog(true);
      return;
    }
    handleClickCalc(userName, scenarioName);
  };

  const handleShowResults = () => {
    handleShowResult(userName, scenarioName);
  };

  const handleShowInfo = () => {
    // TODO: Implement info dialog
    alert('情報ダイアログは実装予定です');
  };

  return (
    <MainLayout>
      <Header
        currentYear={decisionVar.year}
        onSimulate={handleSimulate}
        onShowInfo={handleShowInfo}
        showResultButton={showResultButton}
        onShowResult={handleShowResults}
        isLoading={loading}
      />

      <div className="p-6 space-y-6">
        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: System diagram */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="relative w-full">
                <Image
                  src="/stockflow_mayfes.png"
                  alt="システム図"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side: Gauges and Chart */}
          <div className="space-y-6">
            <GaugePanel
              currentValues={currentValues}
              currentYear={decisionVar.year}
            />

            <PredictionChart
              simulationData={simulationData}
              predictData={chartPredictData}
              selectedIndicator={selectedIndicator}
              onIndicatorChange={setSelectedIndicator}
            />
          </div>
        </div>

        {/* Adaptation controls */}
        <AdaptationControls
          decisionVar={decisionVar}
          onUpdate={updateDecisionVar}
        />
      </div>

      {/* User name dialog */}
      <UserNameDialog
        open={openNameDialog}
        onClose={handleUserNameRegister}
      />
    </MainLayout>
  );
}
