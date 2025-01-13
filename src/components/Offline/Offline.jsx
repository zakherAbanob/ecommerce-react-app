import useOnline from "../../Hooks/UseOnline";

export default function Offline({ children }) {
  let isOnline = useOnline();

  if (!isOnline) {
    return children;
  }
}
