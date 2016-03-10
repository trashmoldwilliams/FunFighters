using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Battle
  {
    private Fighter _leftFighter;
    private Fighter _rightFighter;
    private List<Move> _moveDocket;
    private Fighter _isFirst;
    private Fighter _isSecond;

    public Battle(Fighter LeftFighter, Fighter RightFighter)
    {
      _leftFighter = LeftFighter;
      _rightFighter = RightFighter;
      _moveDocket = new List<Move> {};
      _isFirst = new Fighter("Placeholder",1,1,1,1,1,1,1);
      _isSecond = new Fighter("Placeholder",1,1,1,1,1,1,1);
    }

    public Fighter GetLeftFighter()
    {
      return _leftFighter;
    }

    public Fighter GetRightFighter()
    {
      return _rightFighter;
    }

    public List<Move> GetMoveDocket()
    {
      return _moveDocket;
    }

    public Fighter GetFirst()
    {
      return _isFirst;
    }

    public Fighter GetSecond()
    {
      return _isSecond;
    }

    public void SetFirst(Fighter First)
    {
      _isFirst = First;
    }

    public void SetSecond(Fighter Second)
    {
      _isSecond = Second;
    }

    public void AddToDocket(Move moveInput)
    {
      _moveDocket.Add(moveInput);
    }

    public void AddMoves(Move LeftMove, Move RightMove)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1, 100);

      if(this.GetLeftFighter().GetSpeed() >= this.GetRightFighter().GetSpeed())
      {
        SetFirst(GetLeftFighter());
        SetSecond(GetRightFighter());
        this.AddToDocket(LeftMove);
        this.AddToDocket(RightMove);
      }
      else if (this.GetRightFighter().GetSpeed() >= this.GetLeftFighter().GetSpeed())
      {
        SetFirst(GetRightFighter());
        SetSecond(GetLeftFighter());
        this.AddToDocket(RightMove);
        this.AddToDocket(LeftMove);
      }
      else if (randomNumber <= 50)
      {
        SetFirst(GetLeftFighter());
        SetSecond(GetRightFighter());
        this.AddToDocket(LeftMove);
        this.AddToDocket(RightMove);
      }
      else
      {
        SetFirst(GetRightFighter());
        SetSecond(GetLeftFighter());
        this.AddToDocket(RightMove);
        this.AddToDocket(LeftMove);
      }
    }

    public void ExecuteMove(Fighter User, Fighter Opponent)
    {
      Fighter user = User;
      Fighter opponent = Opponent;

      List<Move> moveDocket = GetMoveDocket();
      Move move = moveDocket[0];
      if(move.GetMethod() == "executePunch")
      {
        this.ExecutePunch(user, opponent, move.GetPunchType());
      }
      else if (move.GetMethod() == "executeBlock")
      {
        this.ExecuteBlock(user);
      }
      else if(move.GetMethod() == "executeBlind")
      {
        this.ExecuteBlind(user, opponent);
      }
      else if (move.GetMethod() == "executeLockon")
      {
        this.ExecuteLockon(user);
      }
      else if(move.GetMethod() == "executeFrostBlast")
      {
        this.ExecuteFrost(user, opponent);
      }
      else
      {
        this.ExecutePyro(user, opponent);
      }

      moveDocket.RemoveAt(0);
    }

    public double ExecutePunch(Fighter user, Fighter target, Punch punch)
    {
      Random rnd = new Random();
      int randomNumber = rnd.Next(1, 100);

      if(randomNumber <= (punch.GetAccuracy() + user.GetAccuracy() - (target.GetSpeed() *0.5) ))
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

      if(randomNumber <= (80 + user.GetAccuracy() - (target.GetSpeed() * 0.5 )))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetAccuracy() * 0.2;
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

    public List<double> ExecuteLockon(Fighter user)
    {
      user.SetMp(user.GetMp() - 2);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      List<double> output = new List<double>();

      if(randomNumber <= user.GetLuck())
      {
        double output1 = user.GetAccuracy() * 0.4;
        output.Add(output1);
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.4));

        double output2 = user.GetLuck() * 0.4;
        output.Add(output2);
        user.SetLuck(user.GetLuck() + (user.GetLuck() * 0.4));
        return output;
      }
      else
      {
        double output1 = user.GetAccuracy() * 0.2;
        output.Add(output1);
        user.SetAccuracy(user.GetAccuracy() + (user.GetAccuracy() * 0.2));

        double output2 = user.GetLuck() * 0.2;
        output.Add(output2);
        user.SetLuck(user.GetLuck() + (user.GetLuck() * 0.2));
        return output;
      }
    }

    public double ExecutePyro(Fighter user, Fighter target)
    {
      user.SetMp(user.GetMp() - 6);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= (80 + user.GetAccuracy() - (target.GetSpeed() * 0.5)))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetAttack() * 0.3;;
          target.SetAttack(target.GetAttack() * 0.7);
          target.SetBurn(target.GetBurn() + 30);
          return output;
        }
        else
        {
          double output = target.GetAttack() * 0.6;
          target.SetAttack(target.GetAttack() * 0.4);
          target.SetBurn(target.GetBurn() + 15);
          return output;
        }
      }
      else
      {
        return 999;
      }
    }

    public double ExecuteFrost(Fighter user, Fighter target)
    {
      user.SetMp(user.GetMp() - 3);

      Random rnd = new Random();
      int randomNumber = rnd.Next(1,100);

      if(randomNumber <= (90 + user.GetAccuracy() - (target.GetSpeed() * 0.5)))
      {
        if(randomNumber <= user.GetLuck())
        {
          double output = target.GetSpeed() * 0.4;
          target.SetSpeed(target.GetSpeed() * 0.6);
          target.SetHp(target.GetHp() - (target.GetHp() * 0.2));
          return output;
        }
        else
        {
          double output = target.GetSpeed() * 0.2;
          target.SetSpeed(target.GetSpeed() * 0.8);
          target.SetHp(target.GetHp() - (target.GetHp() * 0.1));
          return output;
        }
      }
      else
      {
        return 999;
      }
    }

    public string AIMove()
    {
      Fighter leftFighter = GetLeftFighter();
      Fighter rightFighter = GetRightFighter();

      if((rightFighter.GetMp() >= 5) && ((((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) + 80)>50)))
      {
        return "burn";
      }
      else if (((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) < 30) && (rightFighter.GetMp() >= 2))
      {
        return "lockon";
      }
      else if ((leftFighter.GetSpeed() > 50) && (rightFighter.GetMp() >= 3))
      {
        return "frost";
      }
      else if ((((rightFighter.GetAccuracy() -leftFighter.GetSpeed()) + 100) <= 10) &&(rightFighter.GetMp() < 2))
      {
        return "jab";
      }
      else if ((rightFighter.GetHp() >= (leftFighter.GetHp() * 2)) && ((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) > 50))
      {
        return "hook";
      }
      else if ((leftFighter.GetHp() <= leftFighter.GetBurn()) && (rightFighter.GetSpeed() < leftFighter.GetSpeed()))
      {
        return "block";
      }
      else if ((rightFighter.GetMp() >= 1) && ((leftFighter.GetAccuracy() - rightFighter.GetSpeed()) >60) )
      {
        return "blind";
      }
      else if (((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) + 30) >=100)
      {
        return "uppercut";
      }
      else if ((rightFighter.GetLuck() >= 50) && (rightFighter.GetMp() >= 5) && ((((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) + 80)>30)))
      {
        return "burn";
      }
      else if (((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) + 30) >=100)
      {
        return "uppercut";
      }
      else if ((rightFighter.GetHp() >= (leftFighter.GetHp() * 2)) && ((rightFighter.GetAccuracy() - leftFighter.GetSpeed()) < 50))
      {
        return "jab";
      }
      else if ((rightFighter.GetHp() < leftFighter.GetAttack()) && (((leftFighter.GetAccuracy() - rightFighter.GetSpeed()) +100) > 30))
      {
        return "uppercut";
      }
      else if ((rightFighter.GetHp() < rightFighter.GetMaxHp()) && (leftFighter.GetHp() > rightFighter.GetHp()) && ((rightFighter.GetAccuracy() - leftFighter.GetSpeed() + 65) > 40))
      {
        return "hook";
      }
      else if ((rightFighter.GetHp() <= (rightFighter.GetMaxHp() * 0.25) && rightFighter.GetLuck() >= 40 && (leftFighter.GetHp() >= (leftFighter.GetMaxHp() * 0.5))))
      {
        return "uppercut";
      }
      else
      {
        return "hook";
      }
    }

  }
}
