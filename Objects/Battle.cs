using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Battle
  {
    private Fighter _leftFighter;
    private Fighter _rightFighter;

    public Battle(Fighter LeftFighter, Fighter RightFighter)
    {
      _leftFighter = LeftFighter;
      _rightFighter = RightFighter;
    }

    public double Jab(Fighter user, Fighter target)
    {
      Random rnd = new Random();
      int randomnumba = rnd.Next(1, 100);

      if(randomnumba <= (100 + user.GetAccuracy() - target.GetSpeed()))
      {
        double damage = 0;

        if(randomnumba <= user.GetLuck())
        {
          damage = 2 * (user.GetAttack() * 0.5);
        }
        else
        {
          damage = user.GetAttack() * 0.5;
        }
        target.SetHp(target.GetHp() - (damage - target.GetDefense()));
        return (damage - target.GetDefense());
      }
      else
      {
        return 999;
      }
    }
  }
}
