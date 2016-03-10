// using Xunit;
// using System.Collections.Generic;
// using System;
// using System.Data;
// using System.Data.SqlClient;
// using System.Linq;
//
// namespace Fighters
// {
//   public class FighterTest : IDisposable
//   {
//     public FighterTest()
//     {
//       DBConfiguration.ConnectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Fun_Fighters_Test;Integrated Security=SSPI;";
//     }
//
//     [Fact]
//     public void Test_FightersEmptyAtFirst()
//     {
//       int result = Fighter.GetAll().Count;
//       Assert.Equal(0, result);
//     }
//
//     [Fact]
//     public void Test_FighterReturnTrueForSameName()
//     {
//       Fighter firstFighter = new Fighter("Midas",1,12,4,5,3,5,5);
//       Fighter SecondFighter = new Fighter("Midas",1,12,4,5,3,5,5);
//       Assert.Equal(firstFighter, SecondFighter);
//     }
//         [Fact]
//     public void Test_Save_SavesFighterToDatabase()
//     {
//       //Arrange
//       Fighter testFighter = new Fighter("Midas",1,12,4,5,3,5,5);
//       testFighter.Save();
//
//       //Act
//       List<Fighter> result = Fighter.GetAll();
//       List<Fighter> testList = new List<Fighter>{testFighter};
//
//       //Assert
//       Assert.Equal(testList, result);
//     }
//     //
//     //
//     [Fact]
//     public void Test_Save_AssignsIdToFighterObject()
//     {
//       //Arrange
//       Fighter testFighter = new Fighter("Midas",1,12,4,5,3,5,5);
//       testFighter.Save();
//
//       //Act
//       Fighter savedFighter = Fighter.GetAll()[0];
//       int result = savedFighter.GetId();
//       int testId = savedFighter.GetId();
//
//       //Assert
//       Assert.Equal(testId, result);
//     }
//
//     [Fact]
//     public void Test_Find_FindsFighterInDatabase()
//     {
//       //Arrange
//       Fighter testFighter = new Fighter("Midas",1,12,4,5,3,5,5);
//       testFighter.Save();
//
//       //Act
//       Fighter foundFighter = Fighter.Find(testFighter.GetId());
//
//       //Assert
//       Assert.Equal(testFighter, foundFighter);
//     }
//
//       [Fact]
//         public void Dispose()
//         {
//           Fighter.DeleteAll();
//         }
//       }
//     }
