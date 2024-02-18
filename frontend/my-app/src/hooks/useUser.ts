import useSWR from "swr";
import { useState } from "react";
import { stages } from "../utils";
export const findplayerrow = (stage: number[][]) => {
  const row = stage.filter((row) => {
    return row.includes(2);
  })[0];

  return row;
};

export const findplayercolumn = (stage: number[][]) => {
  const playerrow = findplayerrow(stage);
  const columnnumber = playerrow.indexOf(2);
  const column = [];
  for (let i = 0; i < stage.length; i++) {
    column.push(stage[i][columnnumber]);
  }
  return column;
};

export const useUser = (id: string) => {
  const fetcher = async (key: string) => {
    return fetch(key).then((res) => res.json());
  };

  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${String(Number(id) + 1)}`,
    fetcher
  );
  const [stage, setstage] = useState(stages[Number(id)]);
  const [playerrow, setplayerrow] = useState(findplayerrow(stage));
  const [playercolumn, setplayercolumn] = useState<number[]>(
    findplayercolumn(stage)
  );

  return {
    data,
    error,
    isLoading,
    stage,
    playerrow,
    playercolumn,
    setstage,
    setplayerrow,
    setplayercolumn,
  };
};
