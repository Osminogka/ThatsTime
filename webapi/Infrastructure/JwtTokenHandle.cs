using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace webapi.Infrastructure
{
    public class JwtTokenHandle
    {
        public string Token { get; set; }

        public JwtTokenHandle(string jwtToken)
        {
            if (!string.IsNullOrEmpty(jwtToken) && jwtToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                Token = jwtToken.Substring("Bearer ".Length).Trim();
        }

        public string getUser()
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken jwtTokenObj = tokenHandler.ReadJwtToken(Token);

            Claim? uniqueNameClaim = jwtTokenObj.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if(uniqueNameClaim != null)
            {
                string uniqueNameValue = uniqueNameClaim.Value;
                return uniqueNameValue;
            }

            return "";
        }
    }
}
