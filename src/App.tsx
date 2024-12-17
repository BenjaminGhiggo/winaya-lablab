import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LeftSidebar from './components/Layout/LeftSidebar';
import RightSidebar from './components/Layout/RightSidebar';
import Feed from './components/Feed/Feed';
import Events from './components/Events/Events';
import Forum from './components/Forum/Forum';
import { Store } from './components/Store';
import { ProductDetail } from './components/ProductDetail';
import { Chat } from './components/Chat';
import { Layout } from './components/Layout';
import { Profile } from './components/Profile';
import { FinancialAgent } from './components/agents/FinancialAgent';
import { MarketAgent } from './components/agents/MarketAgent';
import { MarketingAgent } from './components/agents/MarketingAgent';
import AuthRoutes from './AuthRoutes';
import { useEffect } from 'react';
import Welcome from './pages/Welcome'; // Importamos la página Welcome

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de bienvenida que aparece primero */}
        <Route path="/" element={<Navigate to="/auth/welcome" />} />
        
        {/* Página de bienvenida */}
        <Route path="/auth/welcome" element={<Welcome />} />

        {/* Ruta de autenticación (aunque no la necesites, la dejas para rutas específicas) */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Rutas del Feed y otras secciones */}
        <Route
          path="*"
          element={
            <>
              {/* Este layout incluye Navbar, LeftSidebar, RightSidebar */}
              <Navbar />
              <div className="pt-16 flex justify-center sm:justify-start">
                <div className="hidden sm:block">
                  <LeftSidebar />
                </div>
                <main className="flex-1 w-full sm:w-auto sm:ml-64 sm:mr-64 px-4 sm:px-0">
                  <Layout>
                    <Routes>
                      <Route path="/feed" element={<Feed />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/forum" element={<Forum />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/agent/financial" element={<FinancialAgent />} />
                      <Route path="/agent/market" element={<MarketAgent />} />
                      <Route path="/agent/marketing" element={<MarketingAgent />} />
                    </Routes>
                  </Layout>
                </main>
                <div className="hidden sm:block">
                  <RightSidebar />
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



/* function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-pink-600">
              Women Entrepreneurs Events
            </h1>
          </div>
        </div>
      </nav>
      <main className="flex-1 h-[calc(100vh-4rem)]">
        <EventMap />
      </main>
    </div>
  );
}
export default App;
 */