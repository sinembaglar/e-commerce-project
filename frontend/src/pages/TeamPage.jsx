const teamMembers = [
  { name: 'Gökhan Özdemir', role: 'Project Manager' },
  { name: 'Sinem Bağlar', role: 'Full Stack Developer' },
  { name: 'Serhat Han', role: 'Frontend Developer' },
  { name: 'Yaren', role: 'Sales' },
]

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function TeamPage() {
  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Meet Our Team</h1>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 px-4 lg:px-10">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex basis-full flex-col items-center gap-3 border border-neutral-200 px-6 py-8 text-center lg:basis-[calc(25%-12px)]"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white">
                {getInitials(member.name)}
              </span>
              <span className="text-base font-bold text-slate-900">{member.name}</span>
              <span className="text-sm text-neutral-500">{member.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TeamPage
