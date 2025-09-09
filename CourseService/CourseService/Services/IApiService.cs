namespace CourseService.Services
{
    public interface IApiService
    {
        public string Key { get; }
        public HttpClient MyClient { get; }
    }
}
