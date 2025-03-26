export function isAdmin(user: { roles: string[] }) {
  return user.roles.includes('admin');
}
