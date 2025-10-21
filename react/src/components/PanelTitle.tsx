function PanelTitle({ username, title }: { username: string; title: string }) {
  const parsedTitle = `${username}'s ${title}`.toUpperCase();

  return (
    <h1 className="text-center text-comic text-5xl mt-15 mb-15">
      {parsedTitle}
    </h1>
  );
}

export default PanelTitle;
