function PanelTitle({ username, title }: { username: string; title: string }) {
  const parsedTitle = `${title}`.toUpperCase();
  let parsedUsername = `${username}'`.toUpperCase();

  if (!username.endsWith("s")) {
    parsedUsername = `${parsedUsername}s`;
  }

  return (
    <h1 className="text-center text-comic text-5xl mt-15 mb-15">
      <span className="text-accent">{parsedUsername} </span>
      {parsedTitle}
    </h1>
  );
}

export default PanelTitle;
