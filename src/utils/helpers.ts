export const generateId = (name?: string): string => {
  const personName: string[] = (name || "Anonymous").split(" ");
  const prefixCode: string = personName[0].substring(0, 1).toUpperCase() + (personName[1] ? personName[1].substring(0, 1).toUpperCase() : "");
  const dateNow = new Date();
  const h: number = dateNow.getHours();
  const i: number = dateNow.getMinutes();
  const s: number = dateNow.getSeconds();
  const y: number = dateNow.getFullYear();
  const m: number = dateNow.getMonth() + 1;
  const d: number = dateNow.getDate();
  const rn: number[] = [...Array(4)].map(() => Math.floor(Math.random() * 10));
  const uniqId: string = prefixCode + s + d + h + m + i + y + rn[0] + rn[1] + rn[2] + rn[3];

  return uniqId;
};