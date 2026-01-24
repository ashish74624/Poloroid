import { Button } from "./components/ui/button"
import HeroBackground from "./components/HeroBackground"
import { Link } from "react-router-dom"

function App() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-vintage film-grain overflow-hidden bg-background">
      <HeroBackground />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col gap-4">
        <h1 className="font-comfortaa text-7xl font-bold  animate-fade-in text-primary">
          poloroid
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Where your memories are always in focus
        </p>

        <div className="flex flex-row gap-4 justify-center items-center animate-fade-in">
          <Link to='/login'>
            <Button>
              Login
            </Button>
          </Link>
          <Link to='/signup'>
            <Button variant="outline">
              Sign up
            </Button>
          </Link>
        </div>
        <p>Created by: <a href="https://ashish74624.vercel.app" target="_blank">Ashish Kumar</a></p>
      </div>
    </section>
  )
}

export default App
