// using Xunit;
// using System.Collections.Generic;
// using System;
// using System.Data;
// using System.Data.SqlClient;
//
// namespace Fighters
// {
//   public class ImageTest : IDisposable
//   {
//     public ImageTest()
//     {
//       DBConfiguration.ConnectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Fun_Fighters_Test;Integrated Security=SSPI;";
//     }
//
//     [Fact]
//     public void Test_Empty_DBIsEmpty()
//     {
//       //Arrange//Act
//       int result = Image.GetAll().Count;
//       //Assert
//       Assert.Equal(0, result);
//     }
//
//     [Fact]
//     public void Test_Equal_ReturnsTrueForSameName()
//     {
//       //Arrange, Act
//       Image firstImage = new Image("Johnny","/some/path/goes/here.png");
//       Image secondImage = new Image("Johnny","/some/path/goes/here.png");
//
//       //Assert
//       Assert.Equal(firstImage, secondImage);
//     }
//
//     [Fact]
//     public void Test_Save_SavesImageToDatabase()
//     {
//       //Arrange
//       Image testImage = new Image("Johnny","/some/path/goes/here.png",1);
//       testImage.Save();
//
//       //Act
//       List<Image> result = Image.GetAll();
//       List<Image> testList = new List<Image>{testImage};
//
//       //Assert
//       Assert.Equal(testList, result);
//     }
//
//     [Fact]
//     public void Test_GetAll_GetAllImagesInDatabase()
//     {
//       //Arrange
//       Image testImage1 = new Image("Johnny","/some/path/goes/here.png");
//       testImage1.Save();
//       Image testImage2 = new Image("Matty","/some/path/goes/here.png");
//       testImage2.Save();
//       //Act
//       List<Image> result = Image.GetAll();
//       List<Image> testList = new List<Image>{testImage1,testImage2};
//       //Assert
//       Assert.Equal(testList, result);
//     }
//
//     [Fact]
//     public void Test_DeleteAll_DeleteAllImagesInDatabase()
//     {
//       //Arrange
//       Image testImage = new Image("Johnny","/some/path/goes/here.png");
//       testImage.Save();
//       //Act
//       Image.DeleteAll();
//       int result = Image.GetAll().Count;
//       //Assert
//       Assert.Equal(0, result);
//     }
//
//     [Fact]
//     public void Test_Find_FindsImageInDatabase()
//     {
//       //Arrange
//       Image testImage = new Image("Johnny","/some/path/goes/here.png");
//       testImage.Save();
//       //Act
//       Image foundImage = Image.Find(testImage.GetId());
//       //Assert
//       Assert.Equal(testImage, foundImage);
//     }
//
//     [Fact]
//     public void Test_Update_UpdateImageInDatabase()
//     {
//       //Arrange
//
//       Image testImage = new Image("Johnny","/some/path/goes/here.png");
//       testImage.Save();
//       //Act
//       testImage.Update("Mark","/some/path/goes/here.png");
//       //Assert
//       Assert.Equal("Mark", testImage.GetName());
//     }
//
//     [Fact]
//     public void Test_Delete_DeleteSingleImagesInDatabase()
//     {
//       //Arrange
//       Image testImage1 = new Image("Johnny","/some/path/goes/here.png");
//       testImage1.Save();
//       Image testImage2 = new Image("Matty","/some/path/goes/here.png");
//       testImage2.Save();
//       //Act
//       testImage1.Delete();
//       int result = Image.GetAll().Count;
//       //Assert
//       Assert.Equal(1, result);
//     }
//
//     public void Dispose()
//     {
//       Image.DeleteAll();
//     }
//   }
// }
