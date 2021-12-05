using System;
using System.Collections.Generic;
using System.IO;

namespace Day_05
{

    class Coordinates
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    class Position
    {
        public int Pipes { get; set; }
        public Coordinates Coordinates { get; set; }

        public void addPipe()
        {
            Pipes++;
        }
    }

    class Program
    {


        static void Main(string[] args)
        {

            List<List<Position>> map = new List<List<Position>>();

            for (int i = 0; i <= 1000; i++)
            {
                List<Position> row = new List<Position>();
                for (int j = 0; j <= 1000; j++)
                {
                    row.Add(new Position { Pipes = 0, Coordinates = new Coordinates { x = i, y = j } });
                }
                map.Add(row);
            }

            string[] input = File.ReadAllLines("input.txt");
            foreach(string el in input)
            {
                string[] fCoords = el.Split(" -> ")[0].Split(",");
                string[] sCoords = el.Split(" -> ")[1].Split(",");
                if(fCoords[0] == sCoords[0].Replace("\r", "") && fCoords[1] != sCoords[1].Replace("\r", ""))
                {
                    int fCoord = int.Parse(fCoords[1]);
                    int sCoord = int.Parse(sCoords[1]);
                    if (fCoord < sCoord)
                    {
                        for (int i = fCoord; i <= sCoord; i++)
                        {
                            map[int.Parse(fCoords[0])][i].addPipe();
                        }
                    }
                    else
                    {
                        for (int i = sCoord; i <= fCoord; i++)
                        {
                            map[int.Parse(fCoords[0])][i].addPipe();
                        }
                    }
                }
                else if (fCoords[1] == sCoords[1].Replace("\r", "") && fCoords[0] != sCoords[0].Replace("\r", ""))
                {
                    int fCoord = int.Parse(fCoords[0]);
                    int sCoord = int.Parse(sCoords[0]);
                    if (fCoord < sCoord)
                    {
                        for (int i = fCoord; i <= sCoord; i++)
                        {
                            map[i][int.Parse(fCoords[1])].addPipe();
                        }
                    }
                    else
                    {
                        for (int i = sCoord; i <= fCoord; i++)
                        {
                            map[i][int.Parse(fCoords[1])].addPipe();
                        }
                    }
                }
                else
                {
                    int fXCoord = int.Parse(fCoords[0]); //start x
                    int fYCoord = int.Parse(fCoords[1]); //start y
                    int sXCoord = int.Parse(sCoords[0]); //end x
                    int sYCoord = int.Parse(sCoords[1]); //end y
                    if (fXCoord < sXCoord && fYCoord < sYCoord)
                    {
                        for (int i = 0; fXCoord + i <= sXCoord; i++)
                        {
                            map[fXCoord + i][fYCoord + i].addPipe();
                        }
                    }
                    if (fXCoord < sXCoord && fYCoord > sYCoord)
                    {
                        for (int i = 0; fXCoord + i <= sXCoord; i++)
                        {
                            map[fXCoord + i][fYCoord - i].addPipe();
                        }
                    }
                    if (fXCoord > sXCoord && fYCoord > sYCoord)
                    {
                        for (int i = 0; sXCoord + i <= fXCoord; i++)
                        {
                            map[fXCoord - i][fYCoord - i].addPipe();
                        }
                    }
                    if (fXCoord > sXCoord && fYCoord < sYCoord)
                    {
                        for (int i = 0; sXCoord + i <= fXCoord; i++)
                        {
                            map[fXCoord - i][fYCoord + i].addPipe();
                        }
                    }
                }
            }

            int ols = 0;

            foreach(var m in map)
            {
                foreach(var el in m)
                {
                    if (el.Pipes >= 2) ols++;
                }
            }

            Console.WriteLine(ols);

        }
    }
}
