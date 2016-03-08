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

    public double ExecuteBlind(Fighter user, Fighter target)
    {
      user.SetMp(user.GetMp() - 1);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= (80 + user.GetAccuracy() - target.GetSpeed()))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetAccuracy() * 0.2;;
          target.SetAccuracy(target.GetAccuracy() * 0.8);
          return output;
        }
        else
        {
          double output = target.GetAccuracy() * 0.1;
          target.SetAccuracy(target.GetAccuracy() * 0.9);
          return output;
        }
      }
      else
      {
        return 999;
      }
    }

    public double ExecuteLockon(Fighter user)
    {
      user.SetMp(user.GetMp() - 2);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);
      // Console.WriteLine(user.GetAccuracy() + (user.GetAccuracy() * 0.4));

      if(randomNumber <= user.GetLuck())
      {
        double output = user.GetAccuracy() * 0.4;
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.4));
        return output;
      }
      else
      {
        double output = user.GetAccuracy() * 0.2;
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.2));
        return output;
      }
    }
  }
}
