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
    public void Test_Jab()
    {
      Fighter firstFighter = new Fighter("Midas","Image/path", 12,4,50,3,1000,50);
      Fighter SecondFighter = new Fighter("Midas","Image/path", 12,4,5,10,10,50);
      Battle currentBattle = new Battle(firstFighter, SecondFighter);
      Assert.Equal(24, currentBattle.Jab(firstFighter, SecondFighter));
    }
  }
}
