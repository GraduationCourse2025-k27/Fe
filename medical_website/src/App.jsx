
import ScrollToTop from "./components/ScrollToTop";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
      <ScrollToTop/>
        <AppRouter/>
      </div>
    </>
  );
}

export default App;
