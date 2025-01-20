

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Oops! You're too fast! <br/> please slow down a bit.
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        Looks like you've been a little too eager.
        We've put a temporary pause. Please try again shortly.
      </p>
    </main>
  )
}

export default Page