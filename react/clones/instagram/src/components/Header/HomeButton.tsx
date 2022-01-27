import React from "react";

type Props = {};

export default function HomeButton({}: Props) {
  return (
    <a href="/" title="Accueil">
      <img src="/images/home.png" alt="logo instagram" />
    </a>
  );
}
