import { Button } from "@/components/ui/button";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import Image from "next/image";
import Link from "next/link"

export default async function Home() {
  const db = drizzle(process.env.DATABASE_URL!, { schema });
  const users = await db.query.users.findMany(
    {
      with: { roles: true },
    }
  );
  const lessons = await db.query.lessons.findMany();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.firstName}</Link>
            <span>{user.lastName}</span>
            <span>{user.email}</span>
            {/* <span>{user.age}</span> */}
            <span>{user.createdAt.toLocaleDateString()}</span>
            <span>{user.updatedAt.toLocaleDateString()}</span>
            <span>
              {user.roles.map((role) => role.role).join(", ")}
            </span>
            {/* {
              (async () => {
                const roles = await db.query.userRoles.findMany({
                  where: (ur) => eq(ur.userId, user.id),
                });
                return roles.map((role) => role.role).join(", ");
              })()
            } */}
          </li>
        ))}
      </ul>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <h3>{lesson.title}</h3>
            {/* <div dangerouslySetInnerHTML={{ __html: lesson.content }} /> */}
            <span>{lesson.createdAt.toLocaleDateString()}</span>
            <span>{lesson.updatedAt.toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};

