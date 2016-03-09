using System.Collections.Generic;
using System.Data.SqlClient;
using System;

namespace Fighters
{
  public class Image
  {
    private int _id;
    private string _name;
    private string _image;

    public Image(string Name, string Image, int Id = 0)
    {
      _id = Id;
      _name = Name;
      _image = Image;
    }


  public override bool Equals(System.Object otherImage)
  {
      if (!(otherImage is Image))
      {
        return false;
      }
      else
      {
        Image newImage = (Image) otherImage;
        bool idEquality = this.GetId() == newImage.GetId();
        bool nameEquality = this.GetName() == newImage.GetName();
        bool imageEquality = this.GetImageLocation() == newImage.GetImageLocation();
        return (idEquality && nameEquality && imageEquality);
      }
    }
    public int GetId()
    {
      return _id;
    }
    public void SetId(int Id)
    {
      _id = Id;
    }
    public string GetName()
    {
      return _name;
    }
    public void SetName(string Name)
    {
      _name = Name;
    }
    public string GetImageLocation()
    {
      return _image;
    }
    public void SetImageLocation(string Image)
    {
      _image = Image;
    }

    public void Save()
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("Insert INTO fighter_images (name,image_path) OUTPUT INSERTED.id VALUES (@ImageName, @ImagePath);", conn);

      SqlParameter nameParameter = new SqlParameter();
      nameParameter.ParameterName = "@ImageName";
      nameParameter.Value = this.GetName();
      cmd.Parameters.Add(nameParameter);

      SqlParameter imageParameter = new SqlParameter();
      imageParameter.ParameterName = "@ImagePath";
      imageParameter.Value = this.GetImageLocation();
      cmd.Parameters.Add(imageParameter);

      rdr = cmd.ExecuteReader();

      while(rdr.Read())
      {
        this._id = rdr.GetInt32(0);
      }
      if (rdr != null)
      {
        rdr.Close();
      }
      if(conn != null)
      {
        conn.Close();
      }
    }
    public static List<Image> GetAll()
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      List<Image> myListImage = new List<Image>{};

      SqlCommand cmd = new SqlCommand("SELECT * FROM fighter_images;", conn);
      rdr = cmd.ExecuteReader();

      while(rdr.Read())
      {
        int id = rdr.GetInt32(0);
        string name = rdr.GetString(1);
        string image = rdr.GetString(2);
        Image newImage = new Image(name, image, id);
        myListImage.Add(newImage);
      }
      if (rdr != null)
      {
        rdr.Close();
      }
      if(conn != null)
      {
        conn.Close();
      }
      return myListImage;
    }
    public static Image Find(int id)
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr = null;
      conn.Open();

      SqlCommand cmd = new SqlCommand("SELECT * FROM fighter_images WHERE id = @ImageId;", conn);
      SqlParameter ImageIdParameter = new SqlParameter();
      ImageIdParameter.ParameterName = "@ImageId";
      ImageIdParameter.Value = id.ToString();
      cmd.Parameters.Add(ImageIdParameter);
      rdr = cmd.ExecuteReader();

      int foundImageId = 0;
      string foundImageName = null;
      string foundImageLocation = null;

      while(rdr.Read())
      {
        foundImageId = rdr.GetInt32(0);
        foundImageName = rdr.GetString(1);
        foundImageLocation = rdr.GetString(2);

      }
      Image foundImage = new Image(foundImageName, foundImageLocation, foundImageId);

      if (rdr != null)
      {
        rdr.Close();
      }
      if (conn != null)
      {
        conn.Close();
      }
      return foundImage;
    }
    public void Update(string newName, string newLocation)
    {
      SqlConnection conn = DB.Connection();
      SqlDataReader rdr;
      conn.Open();

      SqlCommand cmd = new SqlCommand("UPDATE fighter_images SET name = @ImageName, image_path = @ImagePath OUTPUT INSERTED.name, INSERTED.image_path WHERE id = @ImageId;", conn);
      SqlParameter nameParameter = new SqlParameter();
      nameParameter.ParameterName = "@ImageName";
      nameParameter.Value = newName;
      cmd.Parameters.Add(nameParameter);

      SqlParameter imageParameter = new SqlParameter();
      imageParameter.ParameterName = "@ImagePath";
      imageParameter.Value = newLocation;
      cmd.Parameters.Add(imageParameter);

      SqlParameter idParameter = new SqlParameter();
      idParameter.ParameterName = "@ImageId";
      idParameter.Value = this.GetId();
      cmd.Parameters.Add(idParameter);

      rdr = cmd.ExecuteReader();

      while(rdr.Read())
      {
        this._name = rdr.GetString(0);
        this._image = rdr.GetString(1);
      }

      if (rdr != null)
      {
        rdr.Close();
      }

      if (conn != null)
      {
        conn.Close();
      }

    }
    public void Delete()
    {
      SqlConnection conn = DB.Connection();
      conn.Open();
      SqlCommand cmd = new SqlCommand("DELETE FROM fighter_images where id = @Id;", conn);

      SqlParameter idParameter = new SqlParameter();
      idParameter.ParameterName = "@Id";
      idParameter.Value = this.GetId();
      cmd.Parameters.Add(idParameter);
      cmd.ExecuteNonQuery();
    }
    public static void DeleteAll()
    {
      SqlConnection conn = DB.Connection();
      conn.Open();
      SqlCommand cmd = new SqlCommand("DELETE FROM fighter_images;", conn);
      cmd.ExecuteNonQuery();
    }
  }
}
