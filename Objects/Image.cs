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
  public void SetId(Id)
  {
    _id = Id;
  }
  public string GetName()
  {
    return _name;
  }
  public void SetName(Name)
  {
    _name = Name;
  }
  public string GetImageLocation()
  {
    return _imageId;
  }
  public void SetImageLocation(Image)
  {
    _image = Image;
  }
}
