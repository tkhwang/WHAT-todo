import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10 p-24">
      <h1 className="text-4xl font-bold">WHAT-todo-dev</h1>
      Todo from experts with supervisors
      <Image
        src="/images/team-checklist-pana.png"
        alt="what-todo banner image"
        width={400}
        height={200}
      />
    </main>
  )
}
