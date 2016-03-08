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

    public double ExecutePunch(Fighter user, Fighter target, Punch punch)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1, 100);

      if(randomNumber <= (punch.GetAccuracy() + user.GetAccuracy() - target.GetSpeed()))
      {
        double damage = 0;

        if(randomNumber <= user.GetLuck())
        {
          damage = 2 * (user.GetAttack() * punch.GetMultiplier());
        }
        else
        {
          damage = user.GetAttack() * punch.GetMultiplier();
        }
        target.SetHp(target.GetHp() - (damage * target.GetDefense()));
        return (damage * target.GetDefense());
      }
      else
      {
        return 999;
      }
    }

    public double ExecuteBlock(Fighter user)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= user.GetLuck())
      {
        user.SetDefense(0.1);
        return 0.1;
      }
      else
      {
        user.SetDefense(0.65);
        return 0.65;
      }
    }
  }
}
