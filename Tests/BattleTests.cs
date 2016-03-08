using Xunit;
using System.Collections.Generic;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Fighters
{
  public class BattleTest
  {
    public BattleTest()
    {
      DBConfiguration.ConnectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Fun_Fighters_Test;Integrated Security=SSPI;";
    }

    [Fact]
    public void Test_Fight()
    {

      Fighter firstFighter = new Fighter("Midas",1,100,20,20,2,1000,100);
      Fighter SecondFighter = new Fighter("Midas",1,100,4,5,1,1000,100);

      Punch jabPunch = new Punch(1, "JAB", 0.5, 100);
      Punch hookPunch = new Punch(1, "HOOK", 1, 65);
      Punch uppercutPunch = new Punch(1, "UPPERCUT", 2, 30);

      Move jab = new Move(1, "JAB", "executePunch", jabPunch);
      Move hook = new Move(2, "HOOK", "executePunch", hookPunch);
      Move uppercut = new Move(3, "UPPERCUT", "executePunch", uppercutPunch);
      Move block = new Move(4, "BLOCK", "executeBlock", new Punch(0, "PLACEHOLDER", 0, 0));
      Move blind = new Move(5, "BLIND", "executeBlind", new Punch(0, "PLACEHOLDER", 0, 0));
      Move lockon = new Move(6, "LOCKON", "executeLockon", new Punch(0, "PLACEHOLDER", 0, 0));
      Move pyro = new Move(7, "PYRO", "executePyro", new Punch(0, "PLACEHOLDER", 0, 0));

      Battle currentBattle = new Battle(firstFighter, SecondFighter);

      currentBattle.AddMoves(block, uppercut);
      currentBattle.ExecuteMove(currentBattle.GetFirst(), currentBattle.GetSecond());
      currentBattle.ExecuteMove(currentBattle.GetSecond(), currentBattle.GetFirst());

      Assert.Equal(0, firstFighter.GetHp());
    }
  }
}
