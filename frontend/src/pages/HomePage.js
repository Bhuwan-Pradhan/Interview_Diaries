import { useSelector } from "react-redux";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
    <h1>Welcome Jai shree krishna</h1>
    <h2>{user.email}</h2>
    </>
  )
}